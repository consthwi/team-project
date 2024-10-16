export const responsiveTop = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2, // 한 번에 보이는 아이템 수
  },
  tablet: {
    breakpoint: { max: 1024, min: 560 },
    items: 1, // 태블릿에서는 2개의 아이템만 표시
  },
  mobile: {
    breakpoint: { max: 560, min: 0 },
    items: 1, // 한 번에 1개의 아이템만 보임
  },
};
