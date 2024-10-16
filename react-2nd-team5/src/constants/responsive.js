export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4// 예를 들어 데스크탑에서는 4개의 카드가 보이도록 설정
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2// tablet에서 한 번에 5개의 카드가 보이도록 설정
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1 // 모바일에서 한 번에 3개의 카드가 보이도록 설정
  }
};
