import React from "react";
import NavbarItem from "./NavbarItem/NavbarItem";
import NavbarDropdownItem from "./NavbarDropdownItem/NavbarDropdownItem";
import reelIcon from "../../../../../assets/images/reel.svg";
import tvIcon from "../../../../../assets/images/tv.svg";
import userIcon from "../../../../../assets/images/user.svg";
import styles from "./NavbarItems.scss";

const NavbarItems = () => {
  return (
    <React.Fragment>
      <ul className={styles.left}>
        <NavbarDropdownItem icon={reelIcon} shake title="Movies">
          <NavbarItem url="/movies/latest">Latest</NavbarItem>
          <NavbarItem url="/movies/top-rated">Top Rated</NavbarItem>
          <NavbarItem url="/movies/most-voted">Most Voted</NavbarItem>
        </NavbarDropdownItem>
        <NavbarDropdownItem icon={tvIcon} shake title="Series">
          <NavbarItem url="/series/on-the-air">On The Air</NavbarItem>
          <NavbarItem url="/series/top-rated">Top Rated</NavbarItem>
          <NavbarItem url="/series/most-popular">Most Popular</NavbarItem>
        </NavbarDropdownItem>
        <NavbarDropdownItem
          className={styles["mobile-only"]}
          icon={userIcon}
          rotate
          title="User"
        >
          <NavbarItem url="/register">Register</NavbarItem>
          <NavbarItem url="/login">Login</NavbarItem>
        </NavbarDropdownItem>
      </ul>
      <ul className={styles.right}>
        <li>
          <div>
            <input type="text" name="" id="" />
          </div>
        </li>
        <NavbarDropdownItem
          className={styles["desktop-only"]}
          icon={userIcon}
          rotate
          title="User"
        >
          <NavbarItem url="#">Signup</NavbarItem>
          <NavbarItem url="#">Login</NavbarItem>
        </NavbarDropdownItem>
      </ul>
    </React.Fragment>
  );
};

export default NavbarItems;
