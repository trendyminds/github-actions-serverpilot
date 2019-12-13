# ServerPilot GitHub Action

Create and remove ServerPilot applications via a GitHub Action

## Required arguments

| Argument           | Description                                                                  |
|--------------------|------------------------------------------------------------------------------|
| `client_id`        | Your ServerPilot client ID for the API connection                            |
| `api_key`          | Your ServerPilot API Key for the API connection                              |
| `system_user`      | The ServerPilot user to operate as when running commands                     |
| `action`           | The action to perform your ServerPilot account (Either `create` or `delete`) |
| `app_name`         | The name of the app to create or remove                                      |
| `php_version`      | What the PHP version should be if we are creating a new app                  |
| `domain`           | The domain to use for this app if we are creating a new one                  |

## Example usage

```yaml
name: Create Sandbox

on: pull_request

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest

    steps:
      - name: Create a new ServerPilot application
        uses: trendyminds/github-actions-serverpilot@master
        with:
          action: 'create'
          client_id: ${{secrets.SERVERPILOT_CLIENT_ID}}
          api_key: ${{secrets.SERVERPILOT_API_KEY}}
          system_user: ${{secrets.SERVERPILOT_SYSTEM_USER}}
          app_name: 'mytestapp'
          php_version: '7.2'
          domain: 'mytestapp.com'

      - name: Remove a ServerPilot application
        uses: trendyminds/github-actions-serverpilot@master
        with:
          action: 'delete'
          client_id: ${{secrets.SERVERPILOT_CLIENT_ID}}
          api_key: ${{secrets.SERVERPILOT_API_KEY}}
          system_user: ${{secrets.SERVERPILOT_SYSTEM_USER}}
          app_name: 'mytestapp'
```

## Disclaimer

Check your keys. Check your deployment paths. And use at your own risk!
