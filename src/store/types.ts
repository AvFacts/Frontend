import { Result } from 'ts-results'

export const FROZEN_MODULES = ['session']

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {
}

export type Errors = Record<string, string[]>

interface APISuccess<T> {
  response: Response;
  object: T;
}

interface APIFailure {
  response: Response;
  errors: Errors;
}

export type APIResponse<T> = Result<APISuccess<T>, APIFailure>
