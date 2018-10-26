#!/bin/sh
# A script to process all of the CPAD entities that we care about.
# this script writes output that will be stored in the bnhm/spatial-layers
# repository
# TODO: insert the actual directories to process here
node ./runCpad.js State California+Department+of+Parks+and+Recreation
node ./runCpad.js State California+Department+of+Forestry+and+Fire+Protection
node ./runCpad.js State California+Department+of+Fish+and+Wildlife
node ./runCpad.js Special+District East+Bay+Regional+Park+District
node ./runCpad.js Federal United+States+National+Park+Service
node ./runCpad.js Federal United+States+Forest+Service
node ./runCpad.js Federal United+States+Bureau+of+Land+Management
node ./runCpad.js Federal United+States+Army+Corps+of+Engineers
