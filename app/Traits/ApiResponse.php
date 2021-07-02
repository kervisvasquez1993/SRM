<?php

namespace App\Traits;

use App\User;
use Google\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Notification;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

trait ApiResponse
{
    private function successResponse($data, $code)
    {
        return response()->json($data, $code);
    }
    protected function successMensaje($data, $code)
    {
        return response()->json(['data' => $data], $code);
    }
    protected function errorResponse($message, $code)
    {
        return response()->json(['error' => $message, 'code' => $code], $code);
    }

    protected function showAll(Collection $collection, $code = 200)
    {
        return $this->successResponse(['data' => $collection], $code);
    }
    protected function showAllResources(ResourceCollection $collection, $code = 200)
    {
        return $this->successResponse(['data' => $collection], $code);
    }
    protected function showOne(Model $instace, $code = 200)
    {
        return $this->successResponse(['data' => $instace], $code);
    }
    protected function showOneResource(JsonResource $instace, $code = 200)
    {
        return $this->successResponse(['data' => $instace], $code);
    }

    protected function sendNotifications($usuarios, $notificacion)
    {
        Notification::send($usuarios, $notificacion);
        
        $client = new Client();

        // Alternatively, provide the JSON authentication file directly.
        $client->setAuthConfig(base_path() . env('GOOGLE_APPLICATION_CREDENTIALS', "/firebase_credentials.json"));

        // Add the scope as a string (multiple scopes can be provided as an array)
        $client->addScope('https://www.googleapis.com/auth/firebase.messaging');

        // Returns an instance of GuzzleHttp\Client that authenticates with the Google API.
        $httpClient = $client->authorize();

        // Your Firebase project ID
        $project = env('FIREBASE_PROJECT_ID', "");

        // Creates a notification for subscribers to the debug topic
        $message = [
            "message" => [
                "token" => Auth::user()->device_key,
                "notification" => [
                    "body" => $notificacion->text,
                    "title" => $notificacion->title
                ],
                "webpush" => [
                    "fcm_options" => [
                        "link" => $notificacion->link
                    ],
                    "headers" => [
                        "Urgency" => "high"
                    ]
                ]
            ]
        ];

        // Send the Push Notification - use $response to inspect success or errors
        $response = $httpClient->post("https://fcm.googleapis.com/v1/projects/{$project}/messages:send", ['json' => $message]);

        // $url = 'https://fcm.googleapis.com/fcm/send';
        // $FcmToken = $usuarios->whereNotNull('device_key')->pluck('device_key')->all();

        // $serverKey = env('FIREBASE_SERVER_KEY', "");

        // $data = [
        //     "registration_ids" => $FcmToken,
        //     "notification" => [
        //         "title" => $titulo,
        //         "body" => $descripcion,
        //     ]
        // ];
        // $encodedData = json_encode($data);

        // $headers = [
        //     'Authorization:key=' . $serverKey,
        //     'Content-Type: application/json',
        // ];

        // $ch = curl_init();

        // curl_setopt($ch, CURLOPT_URL, $url);
        // curl_setopt($ch, CURLOPT_POST, true);
        // curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        // curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        // // Disabling SSL Certificate support temporarly
        // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $encodedData);

        // // Execute post
        // $result = curl_exec($ch);

        // if ($result === FALSE) {
        //     die('Curl failed: ' . curl_error($ch));
        // }

        // // Close connection
        // curl_close($ch);
    }
}
