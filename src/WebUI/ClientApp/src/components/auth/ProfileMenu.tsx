import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import authService from "./AuthorizeService";
import { ApplicationPaths } from "./ApiAuthorizationConstants";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { classNames } from "../utils";
import { Avatar } from "../Avatar";

interface IProps {}

interface IState {
  isAuthenticated: boolean;
  userName: string | null;
  user: any;
}

export class ProfileMenu extends Component<IProps, IState> {
  _subscription: any;

  constructor(props: IProps) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null,
      user: null,
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser(),
    ]);
    this.setState({
      isAuthenticated,
      userName: user && user.name,
      user: user,
    });
  }

  render() {
    const { isAuthenticated, userName, user } = this.state;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = {
        pathname: `${ApplicationPaths.LogOut}`,
        state: { local: true },
      };
      return this.authenticatedView(userName, profilePath, logoutPath, user);
    }
  }

  authenticatedView(
    userName: any,
    profilePath: any,
    logoutPath: any,
    user?: any
  ) {
    return (
      <Fragment>
        <Menu as="div" className="ml-3 relative">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                  {user ? (
                    <Avatar
                      firstname={user.given_name}
                      lastname={user.family_name}
                    />
                  ) : (
                    ""
                  )}
                  <span className="hidden ml-3 text-gray-700 text-sm font-medium lg:block">
                    <span className="sr-only">Open user menu for </span>
                    {userName}
                  </span>
                  <ChevronDownIcon
                    className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={profilePath}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={logoutPath}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Logout
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </Fragment>
    );
  }

  anonymousView(registerPath: any, loginPath: any) {
    return (
      <Fragment>
        <li>
          <Link className="text-dark" to={registerPath}>
            Register
          </Link>
        </li>
        <li>
          <Link className="text-dark" to={loginPath}>
            Login
          </Link>
        </li>
      </Fragment>
    );
  }
}
