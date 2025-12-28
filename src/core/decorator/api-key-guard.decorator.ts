import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { ApiKeyProtected } from '../guards/api-key.guard';

export function ApiKeyGuard() {
    return applyDecorators(
        ApiSecurity('apiKey'),
        UseGuards(ApiKeyProtected),
    );
}