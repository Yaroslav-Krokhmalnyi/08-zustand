// app/notes/filter/@sidebar/default.tsx

// Styles
import css from "./SidebarNotes.module.css";

// Next.js
import Link from "next/link";

// Constants
import TAGS from "@/constants/noteTags";

function SidebarNotes()  {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {TAGS.map((tag) => {
        return (
          <li className={css.menuItem} key={tag}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarNotes;
