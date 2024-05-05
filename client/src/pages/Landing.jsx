import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <div className="hero" role="banner">
        {/* <h1>Personal Budget</h1>
        <h2>A personal-budget management app</h2> */}
      </div>
      <div className="con-quote">
        <h2>
          &ldquo;Watch the pennies and the dollars will take care of
          themselves&rdquo;
        </h2>
      </div>
      <div className="con-text">
        <p>
          At perosnal budget app, we believe managing your money should be
          straightforward and stress-free. Discover the ease of budgeting with
          tools designed for real life:
        </p>
      </div>
      <div className="cont-list center" role="main">
        <div className="text-box">
          <h1>Instant Expense Tracking</h1>
          <p>
            Forget about piles of receipts and complicated spreadsheets. With
            our app, log and categorize your spending with just a few clicks.
            Whether it&prime;s a morning coffee or a monthly bill, see it all in
            one place in real-time.
          </p>
        </div>

        <div className="text-box">
          <h1>Visual Budgeting</h1>
          <p>
            Our dynamic graphs aren&prime;t just practical, they&prime;re
            powerful. Visualize your spending patterns with colorful,
            easy-to-read charts. Seeing where your money goes helps you make
            smarter choices about where it should go next.
          </p>
        </div>

        <div className="text-box">
          <h1>Insightful Reports</h1>
          <p>
            Knowledge is power, especially when it comes to finances. Get
            customized reports that help you understand your spending habits and
            track your progress towards your financial goals. Adjust your budget
            as your life changes and see how every little adjustment can lead to
            big savings.
          </p>
        </div>
      </div>
      <div className="con-link">
        <p>
          <Link to="/login" className={`mt-2 mb-1`}>
            Log In Now
          </Link>{" "}
          - Transform your financial habits and embrace the peace of a
          well-managed budget.
        </p>
      </div>
    </div>
  );
}

export default Landing;
