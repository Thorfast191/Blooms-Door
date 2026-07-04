"use client";

import { useState } from "react";

import CategoryHero from "./category-hero";
import AllCategoriesDrawer from "./all-categories-drawer";

interface Category {
  id: string;
  name: string;
}

interface Props {
  categories: Category[];
}

export default function HomePageClient({ categories }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <CategoryHero onExploreClick={() => setDrawerOpen(true)} />

      <AllCategoriesDrawer
        open={drawerOpen}
        categories={categories}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
