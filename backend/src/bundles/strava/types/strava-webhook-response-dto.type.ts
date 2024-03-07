type StravaWebhookResponseDto = {
    aspect_type: string;
    event_time: number;
    object_id: number;
    object_type: string;
    owner_id: number;
    subscription_id: string;
    updates: Record<string, unknown>;
};

export { type StravaWebhookResponseDto };
