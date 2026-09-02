export type AreaNavKey =
  | "home"
  | "reports"
  | "arrival"
  | "requests"
  | "property"
  | "billing"
  | "people"
  | "guest";

export type AreaNavItem = {
  key: AreaNavKey;
  to:
    | "/area"
    | "/area/informes"
    | "/area/llegada"
    | "/area/peticiones"
    | "/area/propiedad"
    | "/area/facturacion"
    | "/area/personas"
    | "/area/invitado";
};

/** Bottom navigation on mobile, top of the sidebar on desktop. */
export const AREA_MAIN_NAV: AreaNavItem[] = [
  { key: "home", to: "/area" },
  { key: "reports", to: "/area/informes" },
  { key: "arrival", to: "/area/llegada" },
  { key: "requests", to: "/area/peticiones" },
];

export const AREA_MORE_NAV: AreaNavItem[] = [
  { key: "property", to: "/area/propiedad" },
  { key: "billing", to: "/area/facturacion" },
  { key: "people", to: "/area/personas" },
];

export const AREA_GUEST_NAV: AreaNavItem[] = [{ key: "guest", to: "/area/invitado" }];
