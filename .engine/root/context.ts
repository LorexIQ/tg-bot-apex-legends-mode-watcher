import type { RawApi, SessionFlavor } from 'grammy';
import { Context } from 'grammy';
import type { PrismaUser } from '@/types';
import type { SessionConstructor } from './session';
import type { Message } from 'grammy/types';
import type { AbortSignal } from 'grammy/out/shim.node';
import type { Api, Other as OtherApi } from 'grammy/out/core/api';
import type { Methods } from 'grammy/out/core/client';
import type { HydrateApiFlavor, HydrateFlavor } from '@grammyjs/hydrate';

type Other<M extends Methods<RawApi>, X extends string = never> = OtherApi<RawApi, M, X>;

export class ContextConstructorBuilder extends Context {
  session!: SessionConstructor;
  user?: PrismaUser;

  async reply(text: string, other?: Other<'sendMessage', 'chat_id' | 'text' | 'parse_mode'>, signal?: AbortSignal): Promise<Message.TextMessage> {
    const sentMessage = await super.reply(text, {
      ...other,
      parse_mode: 'HTML'
    }, signal);

    if (sentMessage.message_id) {
      this.session.botLastMessageId = sentMessage.message_id;
    }

    return sentMessage;
  }

  replyMessage(text: string, other?: Other<'sendMessage', 'reply_parameters' | 'chat_id' | 'text'>, signal?: AbortSignal): Promise<Message.TextMessage> {
    return this.reply(text, {
      ...other,
      ...(this.message?.message_id && {
        reply_parameters: {
          message_id: this.message.message_id
        }
      })
    }, signal);
  }
}

export type MyContext = SessionFlavor<SessionConstructor> & HydrateFlavor<ContextConstructorBuilder>;
export type MyApi = HydrateApiFlavor<Api>;
