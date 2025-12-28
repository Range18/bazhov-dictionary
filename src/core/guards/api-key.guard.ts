import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { apiConfig } from "../configs";

@Injectable()
export class ApiKeyProtected implements CanActivate {
    private readonly apiKey: string = apiConfig.apiKey;

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'] || request.query.apiKey;

        if (apiKey !== this.apiKey) {
            throw new ForbiddenException('Forbidden: Invalid API key');
        }

        return true;
    }
}
