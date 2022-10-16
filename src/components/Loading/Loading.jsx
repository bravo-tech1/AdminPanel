// Import Components

// Tree shakable
import { CircularProgress } from "react-cssfx-loading";

export default function Loading() {
  return (
    // Render
    <>
      <div>
        <h1 color="#ff5959">Uploading </h1>
        <CircularProgress
          color="#FF0000"
          width="100px"
          height="100px"
          duration="3s"
        />
      </div>
    </>
  );
}
