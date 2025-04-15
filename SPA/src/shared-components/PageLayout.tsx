const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="min-h-screen pt-[200px] px-4">{children}</div>;
};

export default PageLayout;
