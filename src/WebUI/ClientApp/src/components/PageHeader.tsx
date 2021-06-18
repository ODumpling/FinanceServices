import React, {Fragment, ReactNode} from "react";

interface IProps {
  title?: string;
  children?: ReactNode;
}

export function PageHeader({ title, children }: IProps) {
  return (
    <Fragment>
      {/* Page header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="flex-1 min-w-0">
              {/* Profile */}
              <div className="flex items-center">
                <div>
                  <div className="flex items-center">
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                      {title}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
