function checkAchievementUniqueness(
    achievementsToCheck: number[],
    achievements: number[] | undefined,
): number[] {
    return achievementsToCheck.filter(
        (achievement) => !achievements?.includes(achievement),
    );
}
export { checkAchievementUniqueness };
