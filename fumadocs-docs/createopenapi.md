# Fumadocs Framework: createOpenAPI()
URL: /docs/ui/openapi/server
Source: https://raw.githubusercontent.com/fuma-nama/fumadocs/refs/heads/main/apps/docs/content/docs/ui/openapi/server.mdx

The OpenAPI server instance.
        


## OpenAPI Server

The main config for Fumadocs OpenAPI.

> It should not be referenced in browser environments.

### `input`

The OpenAPI schemas to read from.

* File Paths
* External URLs
* A function (see below)

<CodeBlockTabs defaultValue="Basic">
  <CodeBlockTabsList>
    <CodeBlockTabsTrigger value="Basic">
      Basic
    </CodeBlockTabsTrigger>

    <CodeBlockTabsTrigger value="Function">
      Function
    </CodeBlockTabsTrigger>
  </CodeBlockTabsList>

  <CodeBlockTab value="Basic">
    ```ts
    import { createOpenAPI } from 'fumadocs-openapi/server';

    export const openapi = createOpenAPI({
      input: ['./unkey.json'],
    });
    ```
  </CodeBlockTab>

  <CodeBlockTab value="Function">
    ```ts
    import { createOpenAPI } from 'fumadocs-openapi/server';

    export const openapi = createOpenAPI({
      async input() {
        return {
          // [id]: downloaded OpenAPI Schema
          my_schema: await fetch(
            'https://registry.scalar.com/@scalar/apis/galaxy/latest?format=json',
          ).then((res) => res.json()),
        };
      },
    });
    ```
  </CodeBlockTab>
</CodeBlockTabs>

## Creating Proxy

A proxy server is useful for executing HTTP (`fetch`) requests, as it doesn't have CORS constraints like on the browser.
We can use it for executing HTTP requests on the OpenAPI playground, when the target API endpoints do not have CORS configured correctly.

<Callout type="warn" title="Warning">
  Do not use this on unreliable sites and API endpoints, the proxy server will
  forward all received headers & body, including HTTP-only `Cookies` and
  `Authorization` header.
</Callout>

### Setup

Create a route handler for proxy server.

```ts title="/api/proxy/route.ts"
import { openapi } from '@/lib/openapi';

export const { GET, HEAD, PUT, POST, PATCH, DELETE } = openapi.createProxy({
  // optional, we recommend to set a list of allowed origins for proxied requests
  allowedOrigins: ['https://example.com'],
});
```

> Follow the [Getting Started](/docs/ui/openapi) guide if `openapi` instance is not yet configured.

And set the proxy URL in `createOpenAPI`.

```ts title="lib/openapi.ts"
import { createOpenAPI } from 'fumadocs-openapi/server';

export const openapi = createOpenAPI({
  proxyUrl: '/api/proxy', // [!code ++]
});
```
