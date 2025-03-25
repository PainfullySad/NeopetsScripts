// ==UserScript==
// @name         Keno Automator
// @version      v1.0.2
// @description  Automatically selects the keno picks when accessing the grarrly keno & bets the max bet
// @author       Table (UN: _mega_blast_erke_)
// @match        *.neopets.com/prehistoric/keno.phtml
// @icon         https://www.neopets.com/favicon.ico
// @grant        none
// ==/UserScript==

// Wait for the page to load
$(document).ready(function() {

    // Do you want to use the Quick Pick to randomize the selections by the website?
    // If yes, change the next line to true
    var randomize = false;
    var eggAmount = 10; // if you would like change the amount of eggs to randomize, change this number to a number between 2 and 10

    if (randomize) // Randomize mechanism (uses the same function as the quick pick button)
    {
        random_eggs(eggAmount >= 2 ? eggAmount <= 10 ? eggAmount : 10 : 2);
    }
    else // Personal Pick mechanism
    {
        // Change these to your preferred picks
        var picks = [8, 16, 26, 27, 35, 40, 47, 52, 66, 73];

        // Click on the eggs
        picks.forEach(function(digit) {
            $('input[name="ch' + digit + '"]').trigger('click');
            $('input[name="ch' + digit + '"]').trigger('onclick');
        });
    }
    // Do you want to bet the maximum amount that you can?
    // If no, change the next line to false and add the amount you want to => var desiredBet = {your desired amount};
    var maxBet = true;
    var desiredBet = 0;

    if (maxBet) {
        // Find the max Bet on your page
        var PossibleElementsWithMaxBet = $('.content').find('b');
        PossibleElementsWithMaxBet.each(function() {
            var element = $(this);
            if (element.text().includes(" NP")) {
                desiredBet = element.text().replace(" NP", "")
            }
        });
    }

    // Inputs your bet
    $('input[name="bet"]').val(desiredBet > 9999 ? 9999 : desiredBet);
    show_chart();
});
