import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

/* please style the layout as you see fit */
const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <Suspense>
      <section>
        <div className=" w-full mt-5 lg:mt-0  flex items-center  justify-center ">
          {children}
        </div>
      </section>
    </Suspense>
  );
};

export default AuthLayout;
