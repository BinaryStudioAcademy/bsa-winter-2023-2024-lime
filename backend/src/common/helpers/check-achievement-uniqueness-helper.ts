function checkAchievementUniqueness(
    achievementsToCheck: number,
    achievements: number[] | undefined,
): boolean {
    return achievements ? achievements?.includes(achievementsToCheck) : false;
}
export { checkAchievementUniqueness };
