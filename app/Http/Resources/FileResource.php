<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'url' => Storage::disk('s3')->temporaryUrl(
                $this->url,
                now()->addHours(24),
                [
                    'ResponseContentDisposition' => "attachment; filename=$this->name",
                ]
            ),
            'name' => $this->name,
        ];
    }
}
