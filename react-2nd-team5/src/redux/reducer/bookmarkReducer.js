import { createSlice } from "@reduxjs/toolkit";

// 북마크 상태의 초기 값 (게스트 북마크와 유저별 북마크)
const initialState = {
  guestBookmarks: [], // 게스트 북마크
  userBookmarks: {},  // 유저별 북마크 (유저 ID를 키로 사용)
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    toggleGuestBookmark(state, action) {
      const recipe = action.payload;
      const index = state.guestBookmarks.findIndex(
        (item) => item.RCP_SEQ === recipe.RCP_SEQ
      );

      if (index !== -1) {
        state.guestBookmarks.splice(index, 1);
      } else {
        state.guestBookmarks.push(recipe);
      }
    },
    toggleUserBookmark(state, action) {
      const { userId, recipe } = action.payload;
      if (!state.userBookmarks[userId]) {
        state.userBookmarks[userId] = [];
      }

      const index = state.userBookmarks[userId].findIndex(
        (item) => item.RCP_SEQ === recipe.RCP_SEQ
      );

      if (index !== -1) {
        state.userBookmarks[userId].splice(index, 1);
      } else {
        state.userBookmarks[userId].push(recipe);
      }
    },
  },
});

export const { toggleGuestBookmark, toggleUserBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
