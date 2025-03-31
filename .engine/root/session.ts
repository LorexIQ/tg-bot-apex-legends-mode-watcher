export type SessionStage = 'registration' | 'main';

export type SessionConstructor = {
  userLastMessageId: number;
  botLastMessageId?: number;
};
