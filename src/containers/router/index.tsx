import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../../pages/home";
import { PAGES } from "../../constants/pages";
import { Timer } from "../../pages/timer";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={PAGES.HOME.PATH} element={<Home />} />
        <Route path={PAGES.TIMER.PATH} element={<Timer />} />
      </Routes>
    </BrowserRouter>
  );
};
