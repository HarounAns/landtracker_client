import { useState } from "react";
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, UncontrolledDropdown, NavLink, NavItem } from "reactstrap";
import { calculateCrowDistanceToTysons } from "../helpers/calculateCrowDistanceToTysons";
import { ZillowItem } from "../types";
import { useParams } from "react-router-dom";


export interface IFeedNavbarProps {
  setItems: Function;
  items: ZillowItem[];
  originalItems: ZillowItem[];
  activeFeed: boolean;
}

const SORT_BY_OPTIONS = {
  none: 'Sort By',
  lotSize: 'Most Land',
  price: 'Cheapest',
  livabilityScore: 'Livability Score',
  distance: 'Distance',
}

const FILTER_BY_OPTIONS = {
  none: 'Filter By',
  VA: 'Virginia',
  MD: 'Maryland',
}

export default function FeedNavbar({ items, setItems, originalItems, activeFeed }: IFeedNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortByOption, setSortByOption] = useState(SORT_BY_OPTIONS.none);
  const [filterByOption, setFilterByOption] = useState(FILTER_BY_OPTIONS.none);
  const toggle = () => setIsOpen(!isOpen);

  const setOption = (option: string) => {
    console.log(`Sorting by ${option}`);
    setSortByOption(option);

    let sortedItems;
    if (option === SORT_BY_OPTIONS.lotSize) {
      // sort by lot size
      sortedItems = [...items].sort((a, b) => {
        if (parseFloat(a.lotSize.split(' ')[0]) < (parseFloat(b.lotSize.split(' ')[0]))) {
          return 1;
        }
        if (parseFloat(a.lotSize.split(' ')[0]) > (parseFloat(b.lotSize.split(' ')[0]))) {
          return -1;
        }
        return 0;
      });
    }
    if (option === SORT_BY_OPTIONS.price) {
      // sort by lot size
      sortedItems = [...items].sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
    }
    if (option === SORT_BY_OPTIONS.distance) {
      // sort by distance to tysons
      sortedItems = [...items].sort((a, b) => {
        if (!a.latitude || !a.longitude) return 1;
        if (!b.latitude || !b.longitude) return -1;

        if (calculateCrowDistanceToTysons(a.latitude, a.longitude) > calculateCrowDistanceToTysons(b.latitude, b.longitude)) {
          return 1;
        }
        if (calculateCrowDistanceToTysons(a.latitude, a.longitude) < calculateCrowDistanceToTysons(b.latitude, b.longitude)) {
          return -1;
        }
        return 0;
      });
    }

    if (option === SORT_BY_OPTIONS.livabilityScore) {
      // sort by livability score
      sortedItems = [...items].sort((a, b) => {
        if (!a.livabilityScore) return 1;
        if (!b.livabilityScore) return -1;
        if (a.livabilityScore < b.livabilityScore) {
          return 1;
        }
        if (a.livabilityScore > b.livabilityScore) {
          return -1;
        }
        return 0;
      });
    }

    // sort by timestamp
    if (option === SORT_BY_OPTIONS.none) {
      // sort by lot size
      sortedItems = [...items].sort((a, b) => {
        if (a.SK < b.SK) {
          return 1;
        }
        if (a.SK > b.SK) {
          return -1;
        }
        return 0;
      });
    }
    setItems(sortedItems);
  }

  const setFilter = (option: string) => {
    setFilterByOption(option);

    let filteredItems;
    if (option === FILTER_BY_OPTIONS.VA) {
      filteredItems = originalItems.filter(({ address: { state } }) => state === 'VA');
    }
    if (option === FILTER_BY_OPTIONS.MD) {
      filteredItems = originalItems.filter(({ address: { state } }) => state === 'MD');
    }

    setItems(filteredItems);
  }

  return (
    <div>
      <Navbar
        color="dark"
        expand="md"
        dark
      >
        <NavbarBrand href="/">
          LandTracker
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav
            className="me-auto"
            navbar
            dark
          >
            <UncontrolledDropdown
              inNavbar
              nav
              dark
            >
              <DropdownToggle
                caret
                nav
                dark
              >
                {sortByOption}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem dark onClick={() => setOption(SORT_BY_OPTIONS.lotSize)}>
                  Most Land
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => setOption(SORT_BY_OPTIONS.price)}>
                  Cheapest
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => setOption(SORT_BY_OPTIONS.livabilityScore)}>
                  Livability Score
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => setOption(SORT_BY_OPTIONS.distance)}>
                  Nearest
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown
              inNavbar
              nav
              dark
            >
              <DropdownToggle
                caret
                nav
                dark
              >
                {filterByOption}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => setFilter(FILTER_BY_OPTIONS.VA)}>
                  Virginia
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => setFilter(FILTER_BY_OPTIONS.MD)}>
                  Maryland
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              {activeFeed ?
                (<NavLink href="/inactive">See Inactive</NavLink>)
                :
                (<NavLink href="/">See Active</NavLink>)
              }
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
