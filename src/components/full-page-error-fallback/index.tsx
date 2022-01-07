type FullPageErrorFallbackProps = {
  error?: Error | null;
};

export const FullPageErrorFallback = ({
  error,
}: FullPageErrorFallbackProps): React.ReactElement => (
  <div
    role="alert"
    className="text-red h-screen flex flex-col justify-center items-center"
  >
    <p>Uh oh... There&apos;s a problem. Try refreshing the app.</p>
    <pre>{error?.message}</pre>
  </div>
);
