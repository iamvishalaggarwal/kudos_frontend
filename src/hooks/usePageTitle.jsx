import { useEffect } from "react";

/**
 * A custom hook to manage the document title.
 *
 * @param {string} title - The title to set for the document.
 * @param {string} defaultTitle - The default title to revert to when the component unmounts.
 */
const usePageTitle = (
  title,
  defaultTitle = "KudoSphere"
) => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = defaultTitle;
    };
  }, [title, defaultTitle]);
};

export default usePageTitle;
