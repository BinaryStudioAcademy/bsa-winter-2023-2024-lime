import { type AchievementService } from '~/bundles/achievements/achievement.service.js';
import { type UserAuthResponseDto } from '~/bundles/users/users.js';
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
    type UserGetAllItemResponseDto,
    AchievementsApiPath,
} from './enums/enums.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Achievements:
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
 *              - CYCLING
 *              - RUNNING
 *              - WALKING
 *          requirement:
 *            type: number
 *            format:
 *          requirementMetric:
 *            type: string || null
 *            enum:
 *              - KM
 *              - MINUTES
 *              - STEPS
 *              - KCAL
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
                        params: UserAuthResponseDto;
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
                        params: UserAuthResponseDto;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /api/v1/achievements/:
     *    get:
     *      tags:
     *       - Achievements
     *      description: Returns an array of achievements
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/Achievements'
     *
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
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
     *    get:
     *      tags:
     *       - Achievements
     *      description: Returns an achievement by id
     *      security:
     *        - bearerAuth: []
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/Achievements'
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
     */

    private async findById(
        options: ApiHandlerOptions<{
            params: UserGetAllItemResponseDto;
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
     *    get:
     *      tags:
     *       - UserAchievements
     *      description: Returns achievements for a specific user
     *      security:
     *        - bearerAuth: []
     *      parameters:
     *        - name: id
     *          in: path
     *          description: ID of the user
     *          required: true
     *          schema:
     *            type: number
     *
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                 type: object
     *                 $ref: '#/components/schemas/Achievements'
     *
     *        401:
     *          description: Failed operation
     *          content:
     *              application/json:
     *                  schema:
     *                      type: object
     *                      $ref: '#/components/schemas/Error'
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
        options: ApiHandlerOptions<{ params: UserAuthResponseDto }>,
    ): Promise<ApiHandlerResponse> {
        const { params } = options;
        return this.findByUserId(params.id);
    }
}

export { AchievementController };
