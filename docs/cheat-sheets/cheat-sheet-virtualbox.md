**© 2025 Hamadi Sy. All Rights Reserved. Unauthorized distribution or reproduction is strictly prohibited.**

---

# 🚀 VirtualBox (Ubuntu VM) Essentials as Development Environment

## Description
VirtualBox 80/20-Principle based Cheat Sheet: Solve 80% of your daily Development Environment Ubuntu VM needs. For Full-Stack Developers.

---

## 🎯 Purpose
VirtualBox is a free, open-source virtualization software that allows you to run multiple operating systems on a single machine.

---

## 🌱 Origin
The name "VirtualBox" reflects its role as a "virtual box" for operating systems. Originally developed by Innotek GmbH in 2007, it was later acquired by Sun Microsystems and then Oracle, which maintains it today.

---

## 🧠 Essentials

### ⚙️ Installation
- **On Windows/macOS**: Download from the official website and follow the installer.
    - https://www.virtualbox.org/wiki/Downloads (if not reachable with error "502 Bad Gateway Error, use the following link)
    - https://www.oracle.com/in/virtualization/technologies/vm/downloads/virtualbox-downloads.html
    - Follow the installer (default params are usually sufficient)
    - "Network change/restart warning" is normal. VB needs to create network adapters for its VMs, which requires a brief network restart. You can safely proceed; your internet connection will return automatically.
- **On Linux**: `sudo apt update; sudo apt install virtualbox`

### 🖥️ Creating an Ubuntu VM  

1.  Download the latest LTS version of Ubuntu Desktop ISO file from official website:  
- https://ubuntu.com/download/desktop 
- The choice between AMD and ARM depends on your computer's processor.
    * For Intel or AMD CPUs (the most common for Windows and older macOS): Use the AMD download.
    * For newer Macs with Apple Silicon CPUs: Use the ARM download.
2.  Open VirtualBox and click "New" to create a new VM.
3.  Name your VM, select the Ubuntu ISO file, and set a username & password.
4.  Allocate memory (RAM ≥2GB) and CPU cores, then set the virtual hard disk size.  
- These settings can all be changed later in the VM's configuration.
5. Install Ubuntu Guest Additions: To improve performance and integration. These tools provide several key features, including better screen resizing, shared folders...
6.  Start the VM and follow the on-screen prompts to complete the Ubuntu installation. Choose the following options
- "Install third-party software": adds drivers & codecs for better hardware support
- Installation type "Erase disk and install Ubuntu": formats the selected virtual disk and delete all data.

### 🖥️ Configuring a VM

* 3 VM States
- **Powered Off:** The VM is completely shut down, like a physical computer that is unplugged.
- **Saved:** The VM's state, including its memory, is saved to disk, allowing it to be quickly resumed exactly where it was left off.
- **Running:** The VM is currently active and the guest operating system is in use.

* VM Setting
    - Memory >= 4GB
    - Processors >= 1
    - Video Memory >= 16MB
    - Configure a shared folder between local machine & VM
    - Shared Folders (Guest Additions required)
    - Networking Modes
        * **NAT**: Easy internet access for VM.
        * **Bridged**: VM appears as separate device on the network.
        * **Host-Only**: VM can only communicate with host.

* General Settings in VM
    - Multitasking -> active screen edges.
    - Keyboard -> change keyboard lang if needed 

* Devices Settings Menu in VM:
    - shared clipboard -> bidirectional
    - drag&drop  -> bidirectional

* Quick access in VM:
    - Pin e.g. VS Code & Terminal & Text Editor    
    - Set your default search engine: e.g. https://duckduckgo.com/

* Update Packages in VM:
    - Exec in Terminal `sudo apt update; sudo apt upgrade -y` 

* Fix/update guest additions after installation:
    - Documentation: https://wiki.debian.org/VirtualBox#Installation
    - Open terminal
    - Check Guest Additions by executing `lsmod | grep vboxguest` 
        → no output means not running or installed correctly. If correct, skip the rest
    - Install Build Utils: `sudo apt install -y build-essential dkms linux-headers-$(uname -r)`
    - Method-1: `sudo apt install -y virtualbox-guest-dkms virtualbox-guest-utils virtualbox-guest-x11`
    - Method-2: Download Iso and exec `sudo apt install virtualbox-guest-additions-iso`
    - Restart VM

### 📈 Performance Tips

* Enable **VT-x/AMD-V** in BIOS.
* Allocate sufficient RAM & CPU cores, but leave resources for the host.
* Use SSD for VM storage if possible.
* Take snapshots before major changes → Allows quick rollback.

--- 

### 🧰 Troubleshooting

* On general VirtualBox errors, read Virtualbox Menu -> Log.
* On Load VM error, close VM with the open "Power off the machine" and restart

---

