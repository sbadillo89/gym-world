type CardProps = {
  children?: React.ReactNode;
};

export const Card = ({ children }: CardProps): React.ReactElement => (
  <div
    style={{ boxShadow: "0px 2px 15px rgba(207, 198, 198, 0.5)" }}
    className="rounded-xl px-5 py-3"
  >
    {children}
  </div>
);
