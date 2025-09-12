
export interface Repo {
  name: string;
  full_name: string;
  owner: {
    login: string;
  };
  
}

export interface Commit {
  html_url: any;
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  
}