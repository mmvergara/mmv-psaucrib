export interface userInfo {
  studentNumber: string;
  userName: string;
  userPic: string;
  userPass: string;
  userCredential: string;
}
export interface postsDetails {
  userName: string;
  userPic: string;
  postTitle: string;
  postContent: string;
}

export interface postsDetails {
  userName: string;
  userPic: string;
  postTitle: string;
  postContent: string;
  postDate: string;
  postID:string;
  postComments: {
    userName: string;
    commentContent: string;
  }[]|[];
  postLike: string[]|[];
}

export interface pendingAccountsDetails {
  userCredential: string;
  studentNumber: string;
  userName: string;
  userPass: string;
  userEmail: string;
  userFullName: string;
  userPic: string;
  userPicVerification: string;
}
