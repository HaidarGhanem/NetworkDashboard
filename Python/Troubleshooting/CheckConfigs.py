import json
from netmiko import ConnectHandler

def ensure_correct_configuration(device_ip):
    errors = []

    try:
        # Connect to the device
        device = {
            'device_type': 'cisco_ios',
            'ip': device_ip,
            'username': 'your_username',
            'password': 'your_password',
            'secret': 'enable_password',
        }
        net_connect = ConnectHandler(**device)

        # Enable privileged exec mode
        net_connect.enable()

        # Check the current device configuration
        output = net_connect.send_command('show run')

        # Check if there are any incorrect configurations
        if 'incorrect_option' in output:
            error_details = {
                "error": f"Incorrect configuration found on device {device_ip}",
                "suggestion": "Please review the configuration files and make necessary corrections."
            }
            errors.append(error_details)

            # Perform corrective actions here
            config_commands = [
                'no incorrect_option',
                'correct_option',
            ]
            net_connect.send_config_set(config_commands)

            suggestion_details = {
                "message": f"Configuration fixed on device {device_ip}"
            }
            errors.append(suggestion_details)
        else:
            suggestion_details = {
                "message": f"No incorrect configuration found on device {device_ip}"
            }
            errors.append(suggestion_details)

        # Disconnect from the device
        net_connect.disconnect()

    except Exception as e:
        error_details = {
            "error": f"Error connecting to {device_ip}: {str(e)}",
            "suggestion": "Please check the network connectivity and ensure the device is powered on."
        }
        errors.append(error_details)

    return errors

# Main entry point
if __name__ == '__main__':
    # Specify the IP addresses of the devices
    device_ips = ['192.168.1.1', '192.168.1.2', '192.168.1.3']  # Replace with the actual IP addresses of the devices

    # Ensure correct configuration for each device
    all_errors = {}
    for device_ip in device_ips:
        device_errors = ensure_correct_configuration(device_ip)
        all_errors[device_ip] = device_errors

    # Convert errors to JSON format
    json_errors = json.dumps(all_errors, indent=4)
    print(json_errors)