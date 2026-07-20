# Azure Static Web Platform

A portfolio project demonstrating the end-to-end deployment of a containerized static website on Microsoft Azure using Infrastructure as Code (Terraform), Docker, and GitHub Actions CI/CD.

---

## Project Overview

This project automates the deployment of a simple static website from source code to production.

The infrastructure is provisioned with Terraform, the application is containerized using Docker, and GitHub Actions automatically builds, pushes, and deploys the latest version to an Azure Linux Virtual Machine.

---

## Architecture

```text
Developer
    │
    ▼
VS Code
    │
git push
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├── Build Docker Image
    ├── Push Image to Docker Hub
    └── Deploy to Azure VM
             │
             ▼
        Docker Container
             │
             ▼
       Static Website
```

---

## Technologies Used

- Microsoft Azure
- Terraform
- Docker
- Docker Hub
- GitHub Actions
- Git
- HTML
- CSS
- JavaScript
- Ubuntu Linux
- NGINX

---

## Infrastructure

The environment includes:

- Azure Resource Group
- Virtual Network (VNet)
- Subnet
- Network Security Group
- Public IP Address
- Network Interface
- Ubuntu Linux Virtual Machine

All resources are deployed using Terraform.

---

## CI/CD Pipeline

Every push to the `main` branch automatically:

1. Checks out the repository.
2. Builds a Docker image.
3. Pushes the image to Docker Hub.
4. Connects to the Azure VM using SSH.
5. Pulls the latest image.
6. Replaces the running container.
7. Deploys the updated application.

---

## Project Structure

```text
azure-static-web-platform/
│
├── app/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── Dockerfile
│
├── terraform/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── docs/
│
├── README.md
└── .gitignore
```

---

## Screenshots

Add screenshots here, for example:

- Website running
- Azure Resources
- Terraform Apply
- GitHub Actions Success
- Docker Container Running

Example:

```markdown
![Website](docs/screenshots/website.png)

![Terraform](docs/screenshots/terraform-apply.png)

![Pipeline](docs/screenshots/github-actions.png)
```

---

## Skills Demonstrated

- Infrastructure as Code
- Cloud Networking
- Virtual Machines
- Docker Containerization
- CI/CD Automation
- GitHub Actions
- Linux Administration
- Azure Resource Management
- SSH Authentication
- Git Version Control

---

## Lessons Learned

During this project I learned how to:

- Provision Azure infrastructure using Terraform.
- Deploy containerized applications with Docker.
- Configure secure SSH authentication.
- Build an automated CI/CD pipeline using GitHub Actions.
- Deploy applications to Azure Virtual Machines.
- Document infrastructure and deployment processes.

---

## Future Improvements

- Use Azure Key Vault for secrets management.
- Store Terraform state remotely in Azure Storage.
- Replace VM deployment with Azure Kubernetes Service (AKS).
- Add HTTPS using NGINX and Let's Encrypt.
- Implement monitoring with Azure Monitor and Log Analytics.

---

## Author

**Thato Kgole**

GitHub:
https://github.com/TKgole-Cloud
