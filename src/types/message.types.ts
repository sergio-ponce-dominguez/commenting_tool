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
   * if true, this message was edited
   */
  edited: boolean;

  /**
   * each message has a parent message, the top messages
   * that haven '' as their father
   */
  parentId: string;
  /**
   * ids of all the messages that have this one as a parent
   */
  replies: { [id: string]: null };
};
