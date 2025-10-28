export enum PartnerType {
  Human = '人类',
  MonsterGirl = '魔物娘',
  Furry = '兽娘',
  Elf = '精灵',
  Demon = '恶魔',
  Vampire = '吸血鬼',
  Cyborg = '生化人',
  Inhuman = '人外',
  Ghost = '鬼',
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export interface Settings {
  eroticismIndex: number;
  contextMemory: number; // Number of messages to remember
}