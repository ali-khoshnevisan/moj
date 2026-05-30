interface IStep1 {
  social_media: string;
}

interface IStep2 {
  comment_prompt: string;
  direct_prompt: string;
  campaign_description: string;
  actions: object;
}

interface IStep3 {
  urls: object;
  targetPosts: object;
  bots: object;
  working: boolean;
}

interface IStep4 {
  nameOnCard: string;
  cardNumber: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  cardCvv: string;
  saveCard: string;
}

interface ICreateAccount extends IStep1, IStep2, IStep3 {}

export type { IStep1, IStep2, IStep3, ICreateAccount };
