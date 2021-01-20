import service from "@airslate/platform-service";
import tracing from "@airslate/platform-tracing";

const sdk = () => {
  console.log('sdk');

  console.log('beta test 123');
}


export {
  sdk,
  service,
  tracing
};