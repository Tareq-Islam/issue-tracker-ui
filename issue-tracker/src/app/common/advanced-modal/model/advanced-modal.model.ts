export interface AdvancedModalHeaderMenu {
  label: string;
  visible?: boolean;
  disable?: boolean;
  command?: (item: AdvancedModalHeaderMenu) => void;
}

export interface AdvanchedModalHeader {
  menus?: AdvancedModalHeaderMenu[];
  selectedMenu?: AdvancedModalHeaderMenu;
  title?: string;
  titleStyleClass?: string;
  subTitleStyleClass?: string;
  subTitle?: string;
  wrapperClass?: string;
}


export interface AdvanchedModalContent {
  scrollStyle?: string;
  scrollHeight?: string;
  wrapperClass?: string;
}
