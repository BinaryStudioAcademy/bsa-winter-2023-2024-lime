import { type AchievementService } from '~/bundles/achievements/achievement.service.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    ApiHandlerResponseType,
    BaseController,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

import {
    type AchievementGetItemResponseDto,
    AchievementsApiPath,
} from './enums/enums.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Achievement:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          name:
 *            type: string
 *            format: string
 *          activity:
 *            type: string || null
 *            enum:
 *              - cycling
 *              - running
 *              - walking
 *          requirement:
 *            type: number
 *            format:
 *          requirementMetric:
 *            type: string || null
 *            enum:
 *              - km
 *              - minutes
 *              - steps
 *              - kcal
 */

class AchievementController extends BaseController {
    private achievementService: AchievementService;

    public constructor(logger: Logger, achievementService: AchievementService) {
        super(logger, ApiPath.ACHIEVEMENTS);

        this.achievementService = achievementService;

        this.addRoute({
            path: AchievementsApiPath.ROOT,
            method: 'GET',
            isProtected: true,
            handler: () => this.findAll(),
        });

        this.addRoute({
            path: AchievementsApiPath.ACHIEVEMENT_ID,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.findById(
                    options as ApiHandlerOptions<{
                        params: AchievementGetItemResponseDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AchievementsApiPath.USER_ID,
            method: 'GET',
            isProtected: true,
            handler: (options) =>
                this.findUserParams(
                    options as ApiHandlerOptions<{
                        params: AchievementGetItemResponseDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/v1/achievements/:
     *   get:
     *     tags:
     *       - Achievements
     *     summary: Retrieve achievements
     *     description: Returns an array of achievements.
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       '200':
     *         description: Successful operation. Returns an array of achievements.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Achievement'
     *       '401':
     *         description: Unauthorized. Authentication failure.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */

    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: await this.achievementService.findAll(),
        };
    }

    /**
     * @swagger
     * /api/v1/achievements/{id}:
     *   get:
     *     tags:
     *       - Achievements
     *     summary: Retrieve achievement by ID
     *     description: Returns an achievement by its ID.
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the achievement to retrieve.
     *     responses:
     *       '200':
     *         description: Successful operation. Returns the achievement.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Achievement'
     *       '401':
     *         description: Unauthorized. Authentication failure.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */

    private async findById(
        options: ApiHandlerOptions<{
            params: AchievementGetItemResponseDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { params } = options;
        const achievement = await this.achievementService.findById(params.id);

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: achievement,
        };
    }

    /**
     * @swagger
     * /api/v1/achievements/user/{id}:
     *   get:
     *     tags:
     *       - UserAchievements
     *     description: Returns achievements for a specific user based on parameters
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         description: ID of the user
     *         required: true
     *         schema:
     *           type: number
     *     responses:
     *       '200':
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               $ref: '#/components/schemas/Achievement'
     *       '401':
     *         description: Failed operation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               $ref: '#/components/schemas/Error'
     */

    private async findByUserId(id: number): Promise<ApiHandlerResponse> {
        const userAchievements = await this.achievementService.findByUserId(id);

        return {
            type: ApiHandlerResponseType.DATA,
            status: HttpCode.OK,
            payload: userAchievements,
        };
    }

    private findUserParams(
        options: ApiHandlerOptions<{ params: AchievementGetItemResponseDto }>,
    ): Promise<ApiHandlerResponse> {
        const { params } = options;
        return this.findByUserId(params.id);
    }
}

export { AchievementController };
