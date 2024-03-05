type StravaWebhookResponseDto = {
    aspect_type: string;
    event_time: string;
    object_id: string;
    object_type: string;
    owner_id: string;
    subscription_id: string;
    updates: Record<string, unknown>;
};

export { type StravaWebhookResponseDto };
