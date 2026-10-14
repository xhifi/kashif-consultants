import settings from "../../../data/site-settings.js";

export function SocialCard({ platform }) {
  const name = settings.identity.websiteName;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        backgroundColor: "#18243a",
        color: "#f8f4ec",
        padding: "68px 76px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "64px",
            height: "64px",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "#d5ed75",
            color: "#18243a",
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          {settings.identity.logoMonogram}
        </div>
        <div style={{ display: "flex", fontSize: "27px", fontWeight: 700 }}>
          {name}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div
          style={{
            display: "flex",
            color: "#d5ed75",
            fontSize: "17px",
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Business consulting · London &amp; UK
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: "980px",
            fontSize: "62px",
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: 1.08,
          }}
        >
          From first plan to first sale.
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(248,244,236,0.78)",
            fontSize: "23px",
          }}
        >
          Property procurement · Operational setup · Digital systems
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(248,244,236,0.25)",
          paddingTop: "22px",
          color: "rgba(248,244,236,0.72)",
          fontSize: "18px",
        }}
      >
        <span style={{ display: "flex" }}>{settings.identity.tagline}</span>
        <span style={{ display: "flex", color: "#d5ed75" }}>{platform}</span>
      </div>
    </div>
  );
}
