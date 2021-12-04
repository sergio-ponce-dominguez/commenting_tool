export type Message = {
  id: string;
  /**
   * this text should not be empty
   */
  text: string;
  /**
   * each message is made by an user
   */
  userId: string;
  /**
   * it measure the popularity of the message
   */
  vote: number;
  /**
   * date of creation
   */
  date: Date;

  /**
   * each message has a parent message, except for the top messages
   * that haven null as their father
   */
  parentId: string | null;
  /**
   * ids of all the messages that have this one as a parent
   */
  replies: {[id:string]:null};
};
