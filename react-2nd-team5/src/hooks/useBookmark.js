import { useSelector, useDispatch } from "react-redux";
import { toggleGuestBookmark, toggleUserBookmark } from "../redux/reducer/bookmarkReducer";

export const useBookmark = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  // 게스트와 유저 북마크 상태 구분
  const guestBookmarks = useSelector((state) => state.bookmark.guestBookmarks);
  const userBookmarks = useSelector((state) =>
    state.bookmark.userBookmarks[user?.id] || []
  );

  const bookmarkedRecipes = isLoggedIn && user ? userBookmarks : guestBookmarks;

  // 북마크 토글 함수
  const toggleBookmark = (recipe) => {
    if (isLoggedIn && user) {
      dispatch(toggleUserBookmark({ userId: user.id, recipe }));
    } else {
      dispatch(toggleGuestBookmark(recipe));
    }
  };

  // 특정 레시피가 북마크 되어 있는지 확인하는 함수
  const isBookmarked = (recipe) => {
    return bookmarkedRecipes.some((item) => item.RCP_SEQ === recipe.RCP_SEQ);
  };

  return {
    bookmarkedRecipes,
    toggleBookmark,
    isBookmarked,
  };
};