<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class GeneralNotification extends Notification
{
    public $text;
    public $link;
    public $type;
    public $title;

    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($text, $link, $type, $title="Notificación")
    {
        $this->text = $text;
        $this->link = $link;
        $this->type = $type;
        $this->title = $title;
    }

   
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

   
    public function toArray($notifiable)
    {
        return [
            'text' => $this->text,
            'link' => $this->link,
            'type' => $this->type
        ];
    }
}
