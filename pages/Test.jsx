import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { Button } from "@nextui-org/react";

const Fullpage = () => (
  <ReactFullpage
    //fullpage options
    scrollingSpeed={1000} /* Options here */
    scrollHorizontally={true} /* Because we are using the extension */
    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section bg-red-500">
            <div className="text-center">
              <p className="text-center text-8xl font-bold mb-3">
                Book Review Website
              </p>
              <Button onClick={() => fullpageApi.moveSectionDown()}>
                Click me to move down
              </Button>
            </div>
          </div>
          <div className="section bg-yellow-400">
            <p className="text-center">Section 2</p>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default Fullpage;
