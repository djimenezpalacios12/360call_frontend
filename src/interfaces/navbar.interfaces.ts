export interface NavbarProps {
  children: React.ReactNode;
}

export interface Options {
  title: string;
  icon: React.ReactNode;
  url: string;
}

export interface Views {
  view: string;
  URL: string;
  icon: React.ReactNode;
  access: string[];
}

export interface NavbarPageProps {
  children: React.ReactNode;
}
