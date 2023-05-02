import inquirer from "inquirer";
import PluginPressToContinue from "inquirer-press-to-continue";

inquirer.registerPrompt("press-to-continue", PluginPressToContinue);

export default inquirer;
