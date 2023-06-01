import sys

# Check if the correct number of command line arguments is provided
if len(sys.argv) != 3:
    print("Usage: python script.py <num1> <num2>")
    sys.exit(1)

# Get the command line arguments
num1 = float(sys.argv[1])
num2 = float(sys.argv[2])

# Calculate the sum
sum = num1 + num2

# Print the result
print("Sum:", sum)
