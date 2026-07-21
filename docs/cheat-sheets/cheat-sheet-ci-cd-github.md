**© 2025 Hamadi Sy. All Rights Reserved. Unauthorized distribution or reproduction is strictly prohibited.**

---

# 🚀 GitHub Actions Essentials for CI/CD

## Description

CI/CD with GitHub Actions 80/20-Principle based Cheat Sheet: Solve 80% of your daily CI/CD needs. For Full-Stack Developers.

---

## 🎯 Purpose

Automating the process of building, testing, and deploying code changes to ensure fast, reliable, and consistent delivery into production.

---

## 🌱 Origin

CI/CD is an engineering practice emphasizing Continuous Integration (frequent code merging) and Continuous Delivery/Deployment (automating the release process). GitHub Actions, released by GitHub in 2018, is a flexible, event-driven platform that orchestrates these steps using YAML workflow files, defining jobs that run on virtual runners.

---

## 🧠 Essentials

![ARC42 Essentials](imgs/xx.png)

Core concepts and actions:

### 1. Workflow Structure and Triggers

[Github Workflow Documentation](https://docs.github.com/en/actions/how-tos/write-workflows)
[Github Workflow Syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)

Define the jobs and the events that trigger them in `.github/workflows/*.yml`.

| Concept            | Description                                                                          |
| :----------------- | :----------------------------------------------------------------------------------- |
| **Trigger (`on`)** | Defines when the workflow runs (e.g., push to `main` or manual trigger).             |
| **Jobs**           | Define independent stages (`build_and_test`, `deploy`) that run on separate runners. |
| **Needs**          | Ensures jobs run sequentially (`deploy` only runs if `build_and_test` succeeds).     |

**Essential Snippet:**

```yaml
on:
  push:
    branches:
      - main
  workflow_dispatch: # Allows manual trigger

jobs:
  build_and_test:
    runs-on: ubuntu-latest

  deploy:
    needs: build_and_test
    runs-on: ubuntu-latest
```

### 2. Environment Setup

Every job must start by setting up the codebase and environment using **steps**
[GitHub Marktplace](https://github.com/marketplace)

| Action                 | Purpose                                                      |
| :--------------------- | :----------------------------------------------------------- |
| **actions/checkout**   | Downloads your repository code onto the runner.              |
| **actions/setup-node** | Installs the required Node.js version.                       |
| **working-directory**  | Crucial for monorepos; specifies where run commands execute. |

**Essential Snippet:**

```yaml
steps:
  - name: ⬇️ Checkout code
    uses: actions/checkout@v6

  - name: 🛠️ Setup Node.js Environment
    uses: actions/setup-node@v6
    with:
      node-version: "22"

  - name: 📦 Install Dependencies
    run: npm install # Runs from root package.json

  - name: 🧪 Run Backend Tests
    run: npm test
    working-directory: ./backend # Executes command inside the subfolder
```

### 3. Artifact Exchange (Passing Files Between Jobs)

Since each job runs on a separate machine, artifacts are the only way to pass built files (like zips or compiled assets) between the build_and_test and deploy jobs.

| Action                | Purpose                                                                |
| :-------------------- | :--------------------------------------------------------------------- |
| **upload-artifact**   | Uploads the necessary build output (e.g., zip file) to GitHub storage. |
| **download-artifact** | Downloads artifacts onto the new deployment runner.                    |

**Snippet**

```yaml
# In build_and_test job:
- uses: actions/upload-artifact@v4
  with:
    name: backend-deploy-artifact
    path: ./backend-deploy-artifact.zip # Path must be exact!

# In deploy job:
- name: ⬇️ Download Artifacts
  uses: actions/download-artifact@v5
  with:
    path: artifacts/ # Downloads files into artifacts/subfolder/file.zip
```

### 4. Secure Remote Deployment

Use dedicated marketplace actions to securely transfer code and execute remote scripts on your VPS without exposing credentials.

| Action                  | Purpose                                                                      |
| :---------------------- | :--------------------------------------------------------------------------- |
| **appleboy/scp-action** | Securely copies files (the downloaded artifacts) from the runner to the VPS. |
| **appleboy/ssh-action** | Executes remote commands (e.g., running deploy.sh) on the VPS.               |

**Secrets**
Store sensitive data like keys, passwords, and server IPs (SSH_HOST, SSH_PRIVATE_KEY).
`GitHub Repository -> Settings -> Security -> Secrets and variables -> Actions -> New repository secret`

**Snippet**

```yaml
- name: ⬆️ Copy Artifacts to Cloud VPS (File Transfer)
  uses: appleboy/scp-action@v1
  with:
    host: ${{ secrets.SSH_HOST }}
    username: ${{ secrets.SSH_USER }}
    key: ${{ secrets.SSH_PRIVATE_KEY }}
    source: "artifacts/backend-deploy-artifact/backend-deploy-artifact.zip"
    target: /tmp/deployment_temp/

- name: 🚀 Execute Deployment Script (Remote Command)
  uses: appleboy/ssh-action@v1
  with:
    # ... credentials ...
    script: |
      # Execute the script stored on the VPS
      /home/${{ secrets.SSH_USER }}/deploy.sh ${{ secrets.APP_DIR }}
```

### 5. Local (VPS) Deployment Script

### 6. Deployment Steps

- Create Backend-Start-Service
  /etc/systemd/system/wof.service

```bash
  [Unit]
Description=Wheel of Fortune Node.js Backend API Service (/etc/systemd/system/)
After=network.target

[Service]
# User and Group under which the service will run
User=hsy-adm
Group=hsy-adm

# The working directory for the application
WorkingDirectory=/var/www/hsy-stems.com/wof/backend

# Command to execute the app.
ExecStart=/home/hsy-adm/.nvm/versions/node/v24.11.0/bin/node backend/server.js

# Restart the service automatically on failure
Restart=always
RestartSec=3

# Standard output and error handling
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=wheel-of-fortune

# Environment variables (e.g., for port, database type)
Environment=NODE_ENV=production DB_TYPE=filesystem PORT=3000

[Install]
WantedBy=multi-user.target
```

    systemctl daemon-reload
    systemctl enable wof.service
    journalctl -u wof.service -f

- Update Github PAT to set workflow change permission
- Configure Deployment Secrets

- Install GitHub Actions VS Code Extension to manage Pipelines without leaving Editor
- Create .github/workflows/main.yml
- Create /home/user/deploy.sh
- Configure passwordless sudo exec for cmds in deploy.sh

```bash
visudo

# Allow deploy-user to start/stop/restart the service without a password
#hsy-adm ALL=(ALL) NOPASSWD: /usr/bin/systemctl start wof.service, /usr/bin/systemctl stop wof.service, /usr/bin/systemctl restart wof.service, /usr/bin/syst>

hsy-adm ALL=(ALL) NOPASSWD: /usr/bin/systemctl *, /usr/bin/rsync, /usr/bin/unzip, /usr/bin/chown, /usr/bin/chmod
```

- Configure NginX
